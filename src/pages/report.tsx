import { useEffect, useState } from "react";
import Link from "next/link";

const Report = () => {
    const [visitsData, setVisitsData] = useState<any>();
    const [avatarScrollsData, setAvatarScrollsData] = useState<any>();
    useEffect(() => {
        console.log("%cWelcome to the report!", "color: yellow;");
        fetch("/api/get-visits")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data) {
                    setVisitsData(data.visits);
                    setAvatarScrollsData(data.avatarScrolls);
                }
            });
    }, []);
    return (
        <>
            <h1>Usage report</h1>
            <button>
                <Link href="/">Go back</Link>
            </button>
            <main>
                <section>
                    <span>Total users</span>
                    {visitsData && <figure>{visitsData.length}</figure>}
                </section>

                <section>
                    <span>Users who reached avatar</span>
                    {avatarScrollsData && (
                        <figure>{avatarScrollsData.length}</figure>
                    )}
                </section>

                <section>
                    <span>% of users who reached avatar</span>
                    {avatarScrollsData && visitsData && (
                        <figure>
                            {(
                                (avatarScrollsData.length / visitsData.length) *
                                100
                            ).toFixed(2)}
                            %
                        </figure>
                    )}
                </section>
            </main>
        </>
    );
};

export default Report;
