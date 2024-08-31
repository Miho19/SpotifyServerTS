import app from "../index";
const PORT = process.env.PORT;

function appStart(): void {
  app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
  });
}

async function serverStart(): Promise<void> {
  appStart();
}

serverStart();

export default serverStart;
export { appStart };
