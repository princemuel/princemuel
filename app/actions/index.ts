import { ActionError, defineAction, z } from "astro:actions";
import { resend } from "@/lib/config/clients";
import { envVars } from "@/lib/config/environment";
import { checkIfRateLimited } from "@/lib/helpers/rate-limit";
import { capitalize } from "@/shared/utils";

const contactAction = defineAction({
	accept: "form",
	input: z.object({
		firstName: z
			.string({ message: "This field is required" })
			.min(1, { message: "This field is required" })
			.max(64),
		lastName: z
			.string({ message: "This field is required" })
			.min(1, { message: "This field is required" })
			.max(64),
		email: z
			.string({ message: "This field is required" })
			.min(1, { message: "This field is required" })
			.email({ message: "Please enter a valid email address" }),
		message: z
			.string({ message: "This field is required" })
			.min(1, { message: "This field is required" })
			.min(20, { message: "Message must be up to 20 chars" })
			.max(256),
		queryType: z.enum(["general", "contract", "support", "issues"], {
			message: "Please select a query type",
		}),
		consent: z
			.string({
				message: "To submit this form, please consent to being contacted",
			})
			.refine((value) => value === "on", {
				message: "To submit this form, please consent to being contacted",
			}),
	}),
	handler: async (body, { request }) => {
		const { isRateLimited } = await checkIfRateLimited(request);

		if (isRateLimited)
			throw new ActionError({
				code: "TOO_MANY_REQUESTS",
				message: "You have reached your request limit",
			});

		const response = await resend.emails.send({
			from: `${body.firstName} <${body.email}>`,
			to: envVars.RESEND_ADDRESS,
			subject: `${capitalize(body.queryType)} email from ${body.firstName} ${body.lastName}`,
			replyTo: envVars.RESEND_ADDRESS,
			text: body.message,
		});

		return response.data
			? {
					success: true,
					payload: `Email #${response.data.id.slice(0, 5)} sent`,
				}
			: response.error
				? { success: false, payload: response.error.message }
				: { success: false, payload: "Request failed" };
	},
});

const subscribeAction = defineAction({
	accept: "form",
	input: z.object({
		honeypot: z.string().max(0, "Invalid submission detected.").optional(),
		email: z
			.string({ message: "This field is required" })
			.min(1, { message: "This field is required" })
			.email({ message: "Please enter a valid email address" }),
	}),
	handler: async (body, { request }) => {
		const { isRateLimited } = await checkIfRateLimited(request);

		if (isRateLimited)
			throw new ActionError({
				code: "TOO_MANY_REQUESTS",
				message: "You have reached your request limit",
			});

		const response = await resend.contacts.create({
			email: body.email,
			unsubscribed: false,
			audienceId: envVars.RESEND_AUDIENCE,
		});

		return response.data
			? {
					success: true,
					payload: `Contact #${response.data.id.slice(0, 5)} created`,
				}
			: response.error
				? { success: false, payload: response.error.message }
				: { success: false, payload: "Request failed" };
	},
});

export const server = {
	contact: contactAction,
	subscribe: subscribeAction,
};
