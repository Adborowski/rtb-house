import Head from "next/head";
import Paragraph from "@/components/paragraph";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

export default function Home() {
    const paragraphCount = 20; // how many paragraphs on page
    const lineCount = 20; // how many lines in a paragraph
    const userAvatarPosition = 10; // where to put the user avatar
    const [userData, setUserData] = useState<any>([]);
    const [hasLoggedAvatarScroll, setHasLoggedAvatarScroll] =
        useState<any>(false); // keep this state to avoid duplicate logging of avatar scroll

    // call an API and get an object with random user data
    const getUserData = () => {
        fetch("https://random-data-api.com/api/v2/users")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setUserData(data);
                sessionStorage.setItem("userId", data.uid);
            });
    };

    //  fetch random user data on page load (async)
    useEffect(() => {
        getUserData();
        console.log("Session storage ID", sessionStorage.getItem("userId"));
    }, []);

    //  once you have userData, log it to db as a regular visit
    useEffect(() => {
        if (userData && userData.uid && !sessionStorage.getItem("userId")) {
            const payload = { userId: userData.uid }; // send only the unique userId for speed
            fetch("/api/log-visit", {
                method: "POST",
                body: JSON.stringify(payload),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.uid) {
                        console.log(
                            "%cSaved user id to sessionStorage.",
                            "color: orange",
                            sessionStorage.getItem("userId")
                        );
                    }
                });
        }
    }, [userData]);

    const logAvatarScroll = () => {
        console.log("User reached avatar!", userData.uid);

        if (userData && userData.uid && !hasLoggedAvatarScroll) {
            const payload = { userId: userData.uid }; // send only the unique userId for speed
            fetch("/api/log-avatar-scroll", {
                method: "POST",
                body: JSON.stringify(payload),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setHasLoggedAvatarScroll(true);
                });
        }

        if (hasLoggedAvatarScroll) {
            console.log("Avatar scroll had already been logged for this user.");
        }
    };

    // react-library for intersection-observer boilerplate code
    const { ref, inView, entry } = useInView();

    useEffect(() => {
        if (inView) {
            logAvatarScroll();
        }
    }, [inView]);

    // CREATE DUMMY CONTENT FOR THE PAGE

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
                            <button>
                                <Link href="/report">Go to report</Link>
                            </button>
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
                        ref={ref} // for intersection observer lib
                        src={userData.avatar}
                        width={150}
                        height={150}
                        alt="user avatar"
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
