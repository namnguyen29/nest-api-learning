export async function sleep(): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("I'll sleep in 6 seconds");
    }, 6000);
  });
}
