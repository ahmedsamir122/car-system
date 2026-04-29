import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function PaginationOutlined({ count, page, onChange }) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        variant="outlined"
      />
    </Stack>
  );
}

export default PaginationOutlined;
