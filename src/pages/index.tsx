import Head from "next/head";
import Paragraph from "@/components/paragraph";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
    const paragraphCount = 20; // how many paragraphs on page
    const lineCount = 20; // how many lines in a paragraph
    const userAvatarPosition = 10; // where to put the user avatar
    const [userData, setUserData] = useState<any>([]);

    useEffect(() => {
        getUserData();
    }, []);

    //  once you have userData, log it to db as a regular visit
    useEffect(() => {
        if (userData) {
            // send only unique user id
            const payload = { userId: userData.uid };
            fetch("/api/log-visit", {
                method: "POST",
                body: JSON.stringify(payload),
            });
        }
    }, [userData]);

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

    const getUserData = () => {
        fetch("https://random-data-api.com/api/v2/users")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setUserData(data);
            });
    };

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

            {/* render first batch of paragraphs */}
            {content.map((paragraph, index) => {
                if (index < userAvatarPosition) {
                    return (
                        <section key={index}>
                            <h2>{index + 1}</h2>
                            <Paragraph content={paragraph} />
                        </section>
                    );
                }
            })}

            {/* render user avatar */}
            {userData && (
                <article>
                    <Image
                        src={userData.avatar}
                        width={150}
                        height={150}
                        alt="Picture of the author"
                    />
                </article>
            )}

            {/* render second batch of paragraphs */}
            {content.map((paragraph, index) => {
                if (index >= userAvatarPosition) {
                    return (
                        <section key={index}>
                            <h2>{index + 1}</h2>
                            <Paragraph content={paragraph} />
                        </section>
                    );
                }
            })}
        </>
    );
}
