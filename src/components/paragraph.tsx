const Paragraph = (props: any) => {
    const { content } = props;
    console.log(content);
    return (
        <>
            {content.map((line: string, index: number) => {
                return (
                    <span>
                        <aside>{index + 1}</aside>
                        {line}
                    </span>
                );
            })}
        </>
    );
};

export default Paragraph;
