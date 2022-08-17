import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
	const router = useRouter();
	const [snippetText, setSnippetText] = useState<string>("");
	const snippet = trpc.useMutation(["snippet.saveSnippet"]);

	const handleSaveSnippet = async () => {
		const newlyCreatedSnippet = await snippet.mutateAsync({
			text: snippetText,
		});
		console.table(newlyCreatedSnippet);
		router.push(`/snippets/${newlyCreatedSnippet.id}`);
	};

	return (
		<>
			<Head>
				<title>Pastebin</title>
				<meta name="description" content="Pastebin" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4 gap-4">
				Pastebin Copy
				<p>Feel free to paste a snippet of text or code and you will get back a unique UUID to view it at any time.</p>
				<textarea value={snippetText} placeholder="Enter snippet here" className="outline rounded p-2 w-2/3 h-48" onChange={(e) => setSnippetText(e.target.value)}></textarea>
				<button onClick={handleSaveSnippet} className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded font-semibold active:bg-blue-700">
					Save Snippet
				</button>
			</main>
		</>
	);
};

export default Home;
