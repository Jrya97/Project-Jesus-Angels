import { ChangeEvent } from "react";

export function createHandleChangeAlumno<T>(
    setState: React.Dispatch<React.SetStateAction<T>>
) {
    return (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;

        const keys = name.split(".");

        setState((prev: any) => {
            const updated = { ...prev };
            let current = updated;

            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                current[key] = { ...current[key] };
                current = current[key];
            }

            current[keys[keys.length - 1]] = type === "checkbox"
                ? (e.target as HTMLInputElement).checked
                : value;

            return updated;
        });
    };
}
