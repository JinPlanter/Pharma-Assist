"use client";
import FormValuesProvider from "./contexts/gradeform-context";
import ToggleButton from "./components/ToggleButton";

export default function Home() {
  return (
    <FormValuesProvider>
      <main>
        This is the main page
        <ToggleButton />
      </main>
    </FormValuesProvider>
  );
}
