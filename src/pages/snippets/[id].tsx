import { useRouter } from "next/router";
import Head from "next/head";
import { trpc } from "../../utils/trpc";
import Link from "next/link";

function SnippetPage() {
	const router = useRouter();
	const id = router.query.id as string;

	const snippet = trpc.useQuery([
		"snippet.getSnippet",
		{
			id,
		},
	]);

	const handleCopyToClipboard = () => {
		if (!snippet.data?.text) return;
		navigator.clipboard.writeText(snippet.data.text);
	};
	return (
		<>
			<Head>
				<title>Pastebin</title>
				<meta name="description" content="Pastebin" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="container mx-auto flex flex-col space-y-2 justify-center p-8">
				<div className="flex flex-col space-y-2">
					<h1 className="text-lg font-bold">Viewing snippet</h1>
					<button onClick={() => router.push("/")} className="sm:w-1/3 py-2 bg-gray-200 border border-black rounded active:bg-gray-400">{`< Go Home`}</button>
				</div>

				<div className="flex space-x-2 items-center flex-wrap truncate">
					<Link href={`/snippets/${id}`}>
						<a>{`${process.env.NEXT_PUBLIC_BASE_PATH}/snippets/${snippet.data?.id}`}</a>
					</Link>
					<button onClick={() => navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_PATH}/snippets/${snippet.data?.id}`)} className="bg-gray-200 border p-2 rounded w-full active:bg-gray-300 active:border-black">
						Copy Link
					</button>
				</div>
				<textarea className="w-full h-64 bg-gray-100 border rounded p-2" value={snippet.data?.text}></textarea>
				<button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 active:bg-blue-700" onClick={handleCopyToClipboard}>
					Copy to clipboard
				</button>
			</main>
		</>
	);
}
export default SnippetPage;
