import { Box, Typography } from "@mui/material";

function ErrorComponent() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          boxShadow: "12px 12px 2px 1px rgba(0, 0, 255, .1)",
          border: 1,
        }}
      >
        <Typography variant="h4" sx={{ m: 2 }}>
          Whoops, something went wrong..
        </Typography>
        <Typography variant="h6" sx={{ m: 2 }}>
          It looks like an error was occured. Please try again later!
        </Typography>
      </Box>
    </div>
  );
}

export default ErrorComponent;
