import Head from "next/head";
import Paragraph from "@/components/paragraph";

export default function Home() {
    const paragraphCount = 20; // how many paragraphs
    const lineCount = 20; // how many lines

    // content will be an array of paragraphs
    // each paragraph is an array of strings (lines)
    const content = [];

    //  create an empty paragraph, and add lines to it
    const createParagraph = () => {
        let newParagraph: string[] = [];
        for (let i = 0; i < lineCount; i++) {
            newParagraph.push("Lorem ipsum dolor sit amet.");
        }
        return newParagraph;
    };

    for (let i = 0; i < paragraphCount; i++) {
        content.push(createParagraph());
    }

    console.log(content);

    return (
        <>
            <Head>
                <title>rtb-adam</title>
                <meta name="description" content="rtb-house recruitment task" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {content.map((paragraph, index) => {
                return (
                    <p>
                        <h2>{index + 1}</h2>
                        <Paragraph content={paragraph} />
                    </p>
                );
            })}
        </>
    );
}
