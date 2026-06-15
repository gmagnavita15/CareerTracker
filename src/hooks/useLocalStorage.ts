import { useEffect, useState } from "react";
import type { StorageRecovery } from "../types";

type StoredParser<T> = (rawValue: string | null) => {
    data: T;
    recovered: boolean;
};

function useLocalStorage<T>(
    key: string,
    initialValue: T,
    parser?: StoredParser<T>
) {
    const [initialState] = useState((): {
        value: T;
        recovery: StorageRecovery;
    } => {
        try {
            const storedValue = localStorage.getItem(key);

            if (parser) {
                const result = parser(storedValue);
                return {
                    value: result.data,
                    recovery: result.recovered ? {
                        recovered: true,
                        message: "Some saved data could not be restored.",
                    } : {
                        recovered: false,
                        message: "",
                    },
                };
            }

            return {
                value: storedValue ? JSON.parse(storedValue) as T : initialValue,
                recovery: { recovered: false, message: "" },
            };
        } catch {
            return {
                value: initialValue,
                recovery: {
                    recovered: true,
                    message: "Saved data was reset because it could not be read.",
                },
            };
        }
    });
    const [value, setValue] = useState<T>(initialState.value);
    const [recovery, setRecovery] =
        useState<StorageRecovery>(initialState.recovery);

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            queueMicrotask(() => {
                setRecovery({
                    recovered: true,
                    message: "Changes are available now but could not be saved.",
                });
            });
        }
    }, [key, value]);

    return [value, setValue, recovery] as const;
}

export default useLocalStorage;
