export class RequestError extends Error {
  /** * The error code. */
  public readonly code: ErrorCode;

  // Constructs a RequestError with the Canceled error code.
  static canceled(message: string, cause?: Error) {
    return new RequestError(ErrorCode.Canceled, message, cause);
  }

  // Constructs a RequestError with the Unknown error code.
  static unknown(message: string, cause?: Error) {
    return new RequestError(ErrorCode.Unknown, message, cause);
  }

  // Constructs a RequestError with the InvalidArgument error code.
  static invalidArgument(message: string, cause?: Error) {
    return new RequestError(ErrorCode.InvalidArgument, message, cause);
  }

  // Constructs a RequestError with the DeadlineExceeded error code.
  static deadlineExceeded(message: string, cause?: Error) {
    return new RequestError(ErrorCode.DeadlineExceeded, message, cause);
  }

  // Constructs a RequestError with the NotFound error code.
  static notFound(message: string, cause?: Error) {
    return new RequestError(ErrorCode.NotFound, message, cause);
  }

  // Constructs a RequestError with the AlreadyExists error code.
  static alreadyExists(message: string, cause?: Error) {
    return new RequestError(ErrorCode.AlreadyExists, message, cause);
  }

  // Constructs a RequestError with the PermissionDenied error code.
  static permissionDenied(message: string, cause?: Error) {
    return new RequestError(ErrorCode.PermissionDenied, message, cause);
  }

  // Constructs a RequestError with the ResourceExhausted error code.
  static resourceExhausted(message: string, cause?: Error) {
    return new RequestError(ErrorCode.ResourceExhausted, message, cause);
  }

  // Constructs a RequestError with the FailedPrecondition error code.
  static failedPrecondition(message: string, cause?: Error) {
    return new RequestError(ErrorCode.FailedPrecondition, message, cause);
  }

  // Constructs a RequestError with the Aborted error code.
  static aborted(message: string, cause?: Error) {
    return new RequestError(ErrorCode.Aborted, message, cause);
  }

  // Constructs a RequestError with the OutOfRange error code.
  static outOfRange(message: string, cause?: Error) {
    return new RequestError(ErrorCode.OutOfRange, message, cause);
  }

  // Constructs a RequestError with the Unimplemented error code.
  static unimplemented(message: string, cause?: Error) {
    return new RequestError(ErrorCode.Unimplemented, message, cause);
  }

  // Constructs a RequestError with the Internal error code.
  static internal(message: string, cause?: Error) {
    return new RequestError(ErrorCode.Internal, message, cause);
  }

  // Constructs a RequestError with the Unavailable error code.
  static unavailable(message: string, cause?: Error) {
    return new RequestError(ErrorCode.Unavailable, message, cause);
  }

  // Constructs a RequestError with the DataLoss error code.
  static dataLoss(message: string, cause?: Error) {
    return new RequestError(ErrorCode.DataLoss, message, cause);
  }

  // Constructs a RequestError with the Unauthenticated error code.
  static unauthenticated(message: string, cause?: Error) {
    return new RequestError(ErrorCode.Unauthenticated, message, cause);
  }

  // Constructs a RequestError with the given error code, message, and (optionally) cause.
  constructor(code: ErrorCode, message: string, cause?: Error) {
    // extending errors causes issues after you construct them, unless you apply the following fixes
    super(message, { cause });
    this.code = code;

    // set error name as constructor name,
    // and make it not enumerable to keep the native Error behavior
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target#new.target_in_constructors
    Object.defineProperty(this, "name", {
      value: "RequestError",
      enumerable: false,
      configurable: true,
    });

    // fix the prototype chain
    if (Object.setPrototypeOf === undefined)
      //@ts-expect-error
      this.__proto__ = RequestError.prototype;
    else Object.setPrototypeOf(this, RequestError.prototype);

    // Maintains proper stack trace (only available on V8)
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

enum ErrorCode {
  /**
   * OK indicates the operation was successful.
   */
  OK = "ok",

  /**
   * Canceled indicates the operation was canceled (typically by the caller).
   *
   * The server will generate this error code when cancellation is requested.
   */
  Canceled = "canceled",

  /**
   * Unknown error. An example of where this error may be returned is
   * if a Status value received from another address space belongs to
   * an error-space that is not known in this address space. Also
   * errors raised by APIs that do not return enough error information
   * may be converted to this error.
   *
   * The server will generate this error code in the above two mentioned cases.
   */
  Unknown = "unknown",

  /**
   * InvalidArgument indicates client specified an invalid argument.
   * Note that this differs from FailedPrecondition. It indicates arguments
   * that are problematic regardless of the state of the system
   * (e.g., a malformed file name).
   *
   * This error code will not be generated by the server.
   */
  InvalidArgument = "invalid_argument",

  /**
   * DeadlineExceeded means operation expired before completion.
   * For operations that change the state of the system, this error may be
   * returned even if the operation has completed successfully. For
   * example, a successful response from a server could have been delayed
   * long enough for the deadline to expire.
   *
   * The server will generate this error code when the deadline is
   * exceeded.
   */
  DeadlineExceeded = "deadline_exceeded",

  /**
   * NotFound means some requested entity (e.g., file or directory) was
   * not found.
   *
   * This error code will not be generated by the server.
   */
  NotFound = "not_found",

  /**
   * AlreadyExists means an attempt to create an entity failed because one
   * already exists.
   *
   * This error code will not be generated by the server.
   */
  AlreadyExists = "already_exists",

  /**
   * PermissionDenied indicates the caller does not have permission to
   * execute the specified operation. It must not be used for rejections
   * caused by exhausting some resource (use ResourceExhausted
   * instead for those errors). It must not be
   * used if the caller cannot be identified (use Unauthenticated
   * instead for those errors).
   *
   * This error code will not be generated by the gRPC core framework,
   * but expect authentication middleware to use it.
   */
  PermissionDenied = "permission_denied",

  /**
   * ResourceExhausted indicates some resource has been exhausted, perhaps
   * a per-user quota, or perhaps the entire file system is out of space.
   *
   * This error code will be generated by the server in
   * out-of-memory and server overload situations, or when a message is
   * larger than the configured maximum size.
   */
  ResourceExhausted = "resource_exhausted",

  /**
   * FailedPrecondition indicates operation was rejected because the
   * system is not in a state required for the operation's execution.
   * For example, directory to be deleted may be non-empty, an rmdir
   * operation is applied to a non-directory, etc.
   *
   * A litmus test that may help a service implementor in deciding
   * between FailedPrecondition, Aborted, and Unavailable:
   *  (a) Use Unavailable if the client can retry just the failing call.
   *  (b) Use Aborted if the client should retry at a higher-level
   *      (e.g., restarting a read-modify-write sequence).
   *  (c) Use FailedPrecondition if the client should not retry until
   *      the system state has been explicitly fixed. E.g., if an "rmdir"
   *      fails because the directory is non-empty, FailedPrecondition
   *      should be returned since the client should not retry unless
   *      they have first fixed up the directory by deleting files from it.
   *  (d) Use FailedPrecondition if the client performs conditional
   *      REST Get/Update/Delete on a resource and the resource on the
   *      server does not match the condition. E.g., conflicting
   *      read-modify-write on the same resource.
   *
   * This error code will not be generated by the server.
   */
  FailedPrecondition = "failed_precondition",

  /**
   * Aborted indicates the operation was aborted, typically due to a
   * concurrency issue like sequencer check failures, transaction aborts,
   * etc.
   *
   * See litmus test above for deciding between FailedPrecondition,
   * Aborted, and Unavailable.
   */
  Aborted = "aborted",

  /**
   * OutOfRange means operation was attempted past the valid range.
   * E.g., seeking or reading past end of file.
   *
   * Unlike InvalidArgument, this error indicates a problem that may
   * be fixed if the system state changes. For example, a 32-bit file
   * system will generate InvalidArgument if asked to read at an
   * offset that is not in the range [0,2^32-1], but it will generate
   * OutOfRange if asked to read from an offset past the current
   * file size.
   *
   * There is a fair bit of overlap between FailedPrecondition and
   * OutOfRange. We recommend using OutOfRange (the more specific
   * error) when it applies so that callers who are iterating through
   * a space can easily look for an OutOfRange error to detect when
   * they are done.
   *
   * This error code will not be generated by the server.
   */
  OutOfRange = "out_of_range",

  /**
   * Unimplemented indicates operation is not implemented or not
   * supported/enabled in this service.
   *
   * This error code will be generated by the server. Most
   * commonly, you will see this error code when a method implementation
   * is missing on the server. It can also be generated for unknown
   * compression algorithms or a disagreement as to whether an RPC should
   * be streaming.
   */
  Unimplemented = "unimplemented",

  /**
   * Internal errors. Means some invariants expected by underlying
   * system has been broken. If you see one of these errors,
   * something is very broken.
   *
   * This error code will be generated by the server in several
   * internal error conditions.
   */
  Internal = "internal",

  /**
   * Unavailable indicates the service is currently unavailable.
   * This is a most likely a transient condition and may be corrected
   * by retrying with a backoff. Note that it is not always safe to retry
   * non-idempotent operations.
   *
   * See litmus test above for deciding between FailedPrecondition,
   * Aborted, and Unavailable.
   *
   * This error code will be generated by the server during
   * abrupt shutdown of a server process or network connection.
   */
  Unavailable = "unavailable",

  /**
   * DataLoss indicates unrecoverable data loss or corruption.
   *
   * This error code will not be generated by the server.
   */
  DataLoss = "data_loss",

  /**
   * Unauthenticated indicates the request does not have valid
   * authentication credentials for the operation.
   *
   * The server will generate this error code when the
   * authentication metadata is invalid or a Credentials callback fails,
   * but also expect authentication middleware to generate it.
   */
  Unauthenticated = "unauthenticated",
}

export function get_status_from_code(code: ErrorCode) {
  return ErrorCodeMap.get(code);
}

export function get_code_from_status(status: number) {
  return HttpStatusMap.get(status)?.[0] || ErrorCode.Unimplemented;
}

const ErrorCodeMap = new Map([
  [ErrorCode.OK, 200],
  [ErrorCode.Canceled, 499],
  [ErrorCode.Unknown, 500],
  [ErrorCode.InvalidArgument, 400],
  [ErrorCode.DeadlineExceeded, 504],
  [ErrorCode.NotFound, 404],
  [ErrorCode.AlreadyExists, 409],
  [ErrorCode.PermissionDenied, 403],
  [ErrorCode.ResourceExhausted, 429],
  [ErrorCode.FailedPrecondition, 412],
  [ErrorCode.Aborted, 409],
  [ErrorCode.OutOfRange, 416],
  [ErrorCode.Unimplemented, 501],
  [ErrorCode.Internal, 500],
  [ErrorCode.Unavailable, 503],
  [ErrorCode.DataLoss, 500],
  [ErrorCode.Unauthenticated, 401],
]);

export const HttpStatusMap = new Map<number, ErrorCode[]>([
  [200, [ErrorCode.OK]],
  [499, [ErrorCode.Canceled]],
  [500, [ErrorCode.Unknown, ErrorCode.Internal, ErrorCode.DataLoss]],
  [400, [ErrorCode.InvalidArgument]],
  [504, [ErrorCode.DeadlineExceeded]],
  [404, [ErrorCode.NotFound]],
  [409, [ErrorCode.AlreadyExists, ErrorCode.Aborted]],
  [403, [ErrorCode.PermissionDenied]],
  [429, [ErrorCode.ResourceExhausted]],
  [412, [ErrorCode.FailedPrecondition]],
  [416, [ErrorCode.OutOfRange]],
  [501, [ErrorCode.Unimplemented]],
  [503, [ErrorCode.Unavailable]],
  [401, [ErrorCode.Unauthenticated]],
]);
