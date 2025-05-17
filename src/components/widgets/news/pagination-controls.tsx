import { Button } from "@/components/ui/button";

const PaginationControls = ({
  page,
  setPage,
  isPreviousData,
}: {
  page: number;
  setPage: (n: number) => void;
  isPreviousData?: boolean;
}) => (
  <div className="mt-4 flex justify-between">
    <Button
      variant="ghost"
      onClick={() => setPage(page - 1)}
      disabled={page === 0}
    >
      Prev
    </Button>
    <Button
      variant="ghost"
      onClick={() => setPage(page + 1)}
      disabled={isPreviousData}
    >
      Next
    </Button>
  </div>
);

export default PaginationControls;
