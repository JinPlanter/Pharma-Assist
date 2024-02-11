"use client";
import FormValuesProvider from "./contexts/gradeform-context";

export default function Home() {
  return (
    <FormValuesProvider>
      <main>
        This is the main page
      </main>
    </FormValuesProvider>
  );
}