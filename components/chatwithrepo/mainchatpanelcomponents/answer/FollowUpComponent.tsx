// Defines the FollowUpComponent functional component that takes 'followUp' and 'handleFollowUpClick' as props.
const FollowUpComponent = ({ followUp, handleFollowUpClick }: { followUp: string[]; handleFollowUpClick: (question: string) => void }) => {
    // Defines the 'handleQuestionClick' function that calls the 'handleFollowUpClick' function with the 'question' argument.
    const handleQuestionClick = (question: string) => {
        handleFollowUpClick(question);
    };

    // Returns the JSX for the FollowUpComponent.
    return (
        <div className="bg-card shadow-lg border rounded-lg p-4 mt-2">
            <div className="flex items-center">
                <h2 className="text-lg text-white font-semibold flex-grow">Relevant</h2>
            </div>
            <ul className="mt-2">
                {followUp.map((question: string, index: number) => (
                    <li
                        key={index}
                        className="flex items-center mt-2 cursor-pointer"
                        onClick={() => handleQuestionClick(question)}
                    >
                        <span role="img" aria-label="link" className="mr-2">🔗</span>
                        <p className="text-white hover:underline">{`${question}`}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FollowUpComponent;
