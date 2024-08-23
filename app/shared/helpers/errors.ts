import type { ZodErrorMap } from "zod";

export class ProjectError extends Error {
	/** * The error code. */
	public readonly code: ErrorCode;

	// Constructs a ProjectError with the Canceled error code.
	static canceled(message: string, cause?: Error) {
		return new ProjectError(ErrorCode.Canceled, message, cause);
	}

	// Constructs a ProjectError with the Unknown error code.
	static unknown(message: string, cause?: Error) {
		return new ProjectError(ErrorCode.Unknown, message, cause);
	}

	// Constructs a ProjectError with the InvalidArgument error code.
	static invalidArgument(message: string, cause?: Error) {
		return new ProjectError(ErrorCode.InvalidArgument, message, cause);
	}

	// Constructs a ProjectError with the DeadlineExceeded error code.
	static deadlineExceeded(message: string, cause?: Error) {
		return new ProjectError(ErrorCode.DeadlineExceeded, message, cause);
	}

	// Constructs a ProjectError with the NotFound error code.
	static notFound(message: string, cause?: Error) {
		return new ProjectError(ErrorCode.NotFound, message, cause);
	}

	// Constructs a ProjectError with the AlreadyExists error code.
	static alreadyExists(message: string, cause?: Error) {
		return new ProjectError(ErrorCode.AlreadyExists, message, cause);
	}

	// Constructs a ProjectError with the PermissionDenied error code.
	static permissionDenied(message: string, cause?: Error) {
		return new ProjectError(ErrorCode.PermissionDenied, message, cause);
	}

	// Constructs a ProjectError with the ResourceExhausted error code.
	static resourceExhausted(message: string, cause?: Error) {
		return new ProjectError(ErrorCode.ResourceExhausted, message, cause);
	}

	// Constructs a ProjectError with the FailedPrecondition error code.
	static failedPrecondition(message: string, cause?: Error) {
		return new ProjectError(ErrorCode.FailedPrecondition, message, cause);
	}

	// Constructs a ProjectError with the Aborted error code.
	static aborted(message: string, cause?: Error) {
		return new ProjectError(ErrorCode.Aborted, message, cause);
	}

	// Constructs a ProjectError with the OutOfRange error code.
	static outOfRange(message: string, cause?: Error) {
		return new ProjectError(ErrorCode.OutOfRange, message, cause);
	}

	// Constructs a ProjectError with the Unimplemented error code.
	static unimplemented(message: string, cause?: Error) {
		return new ProjectError(ErrorCode.Unimplemented, message, cause);
	}

	// Constructs a ProjectError with the Internal error code.
	static internal(message: string, cause?: Error) {
		return new ProjectError(ErrorCode.Internal, message, cause);
	}

	// Constructs a ProjectError with the Unavailable error code.
	static unavailable(message: string, cause?: Error) {
		return new ProjectError(ErrorCode.Unavailable, message, cause);
	}

	// Constructs a ProjectError with the DataLoss error code.
	static dataLoss(message: string, cause?: Error) {
		return new ProjectError(ErrorCode.DataLoss, message, cause);
	}

	// Constructs a ProjectError with the Unauthenticated error code.
	static unauthenticated(message: string, cause?: Error) {
		return new ProjectError(ErrorCode.Unauthenticated, message, cause);
	}

	// Constructs a ProjectError with the given error code, message, and (optionally) cause.
	constructor(code: ErrorCode, message: string, cause?: Error) {
		// extending errors causes issues after you construct them, unless you apply the following fixes
		super(message, { cause });
		this.code = code;

		// set error name as constructor name,
		// and make it not enumerable to keep the native Error behavior
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target#new.target_in_constructors
		Object.defineProperty(this, "name", {
			value: "ProjectError",
			enumerable: false,
			configurable: true,
		});

		// fix the prototype chain
		if (Object.setPrototypeOf === undefined)
			//@ts-expect-error
			this.__proto__ = ProjectError.prototype;
		else Object.setPrototypeOf(this, ProjectError.prototype);

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

/**
 *
 * This is a modified version of Astro's error map.
 * source: https://github.com/withastro/astro/blob/main/packages/astro/src/content/error-map.ts
 *
 */

type TypeOrLiteralErrByPathEntry = {
	code: "invalid_type" | "invalid_literal";
	received: unknown;
	expected: unknown[];
};

export const errorMap: ZodErrorMap = (issue, ctx) => {
	const issuePath = flattenErrorPath(issue.path);
	if (issue.code === "invalid_union") {
		// Optimization: Combine type and literal errors for keys that are common across ALL union types
		// Ex. a union between `{ key: z.literal('tutorial') }` and `{ key: z.literal('blog') }` will
		// raise a single error when `key` does not match:
		// > Did not match union.
		// > key: Expected `'tutorial' | 'blog'`, received 'foo'
		const typeOrLiteralErrByPath: Map<string, TypeOrLiteralErrByPathEntry> =
			new Map();
		for (const unionError of issue.unionErrors.flatMap((e) => e.errors)) {
			if (
				unionError.code === "invalid_type" ||
				unionError.code === "invalid_literal"
			) {
				const flattenedErrorPath = flattenErrorPath(unionError.path);
				if (typeOrLiteralErrByPath.has(flattenedErrorPath)) {
					typeOrLiteralErrByPath
						.get(flattenedErrorPath)
						?.expected.push(unionError.expected);
				} else {
					typeOrLiteralErrByPath.set(flattenedErrorPath, {
						code: unionError.code,
						received: unionError.received,
						expected: [unionError.expected],
					});
				}
			}
		}
		const messages: string[] = [
			prefix(
				issuePath,
				typeOrLiteralErrByPath.size
					? "Did not match union:"
					: "Did not match union.",
			),
		];
		return {
			message: messages
				.concat(
					[...typeOrLiteralErrByPath.entries()]
						// If type or literal error isn't common to ALL union types,
						// filter it out. Can lead to confusing noise.
						.filter(
							([, error]) => error.expected.length === issue.unionErrors.length,
						)
						.map(([key, error]) =>
							key === issuePath
								? // Avoid printing the key again if it's a base error
									`> ${getTypeOrLiteralMsg(error)}`
								: `> ${prefix(key, getTypeOrLiteralMsg(error))}`,
						),
				)
				.join("\n"),
		};
	}
	if (issue.code === "invalid_literal" || issue.code === "invalid_type") {
		return {
			message: prefix(
				issuePath,
				getTypeOrLiteralMsg({
					code: issue.code,
					received: issue.received,
					expected: [issue.expected],
				}),
			),
		};
	}
	if (issue.message) {
		return { message: prefix(issuePath, issue.message) };
	}
	return { message: prefix(issuePath, ctx.defaultError) };
};

const getTypeOrLiteralMsg = (error: TypeOrLiteralErrByPathEntry): string => {
	if (error.received === "undefined") return "Required";
	const expectedDeduped = new Set(error.expected);
	switch (error.code) {
		case "invalid_type":
			return `Expected type \`${unionExpectedVals(expectedDeduped)}\`, received ${JSON.stringify(error.received)}`;
		case "invalid_literal":
			return `Expected \`${unionExpectedVals(expectedDeduped)}\`, received ${JSON.stringify(error.received)}`;
	}
};

const prefix = (key: string, msg: string) =>
	key.length ? `**${key}**: ${msg}` : msg;

const unionExpectedVals = (expectedVals: Set<unknown>) =>
	[...expectedVals]
		.map((expectedVal, idx) => {
			if (idx === 0) return JSON.stringify(expectedVal);
			const sep = " | ";
			return `${sep}${JSON.stringify(expectedVal)}`;
		})
		.join("");

const flattenErrorPath = (errorPath: (string | number)[]) =>
	errorPath.join(".");
