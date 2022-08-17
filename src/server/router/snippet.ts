import { createRouter } from "./context";
import { z } from "zod";

export const snippetRouter = createRouter()
	.mutation("saveSnippet", {
		input: z.object({
			text: z.string(),
		}),
		async resolve({ ctx, input }) {
			const snippet = await ctx.prisma.snippet.create({
				data: {
					text: input.text,
				},
			});

			return snippet;
		},
	})
	.query("getSnippet", {
		input: z.object({
			id: z.string(),
		}),
		async resolve({ ctx, input }) {
			const snippet = await ctx.prisma.snippet.findUnique({
				where: {
					id: input.id,
				},
			});

			return snippet;
		},
	});
