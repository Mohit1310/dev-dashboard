import { Button } from "@/components/ui/button";

const RedditPaginationControls = ({
  after,
  setAfter,
  history,
}: {
  after: string;
  setAfter: (cursor: string) => void;
  history: string[];
}) => {
  const currentIndex = history.indexOf(after);

  return (
    <div className="mt-4 flex justify-between">
      <Button
        variant="ghost"
        onClick={() => setAfter(history[currentIndex - 1] || "")}
        disabled={currentIndex <= 0}
      >
        Prev
      </Button>
      <Button
        variant="ghost"
        onClick={() => setAfter(history[currentIndex + 1])}
        disabled={!history[currentIndex + 1]}
      >
        Next
      </Button>
    </div>
  );
};

export default RedditPaginationControls;
