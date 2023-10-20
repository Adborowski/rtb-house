const Paragraph = (props: any) => {
    const { content } = props;
    return (
        <>
            {content.map((line: string, index: number) => {
                return (
                    <span key={index}>
                        <aside>{index + 1}</aside>
                        {line}
                    </span>
                );
            })}
        </>
    );
};

export default Paragraph;
