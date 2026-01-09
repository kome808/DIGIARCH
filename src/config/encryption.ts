// 注意：這是一個簡單的 Client-side 加密實作，金鑰存於程式碼中。
// 在更嚴格的環境中，應由伺服器端處理加密或使用更安全的金鑰管理機制。
// 但由於本專案限制不能使用 import.meta.env，且無後端 API，故採用此折衷方案。

const ENCRYPTION_KEY = 'digiarch-system-secret-key-v1';

export async function encryptValue(text: string): Promise<string> {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        enc.encode(ENCRYPTION_KEY.padEnd(32).slice(0, 32)), // Ensure 256-bit key
        "AES-GCM",
        false,
        ["encrypt"]
    );

    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encodedText = enc.encode(text);

    const encrypted = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        keyMaterial,
        encodedText
    );

    const encryptedArray = new Uint8Array(encrypted);
    const combined = new Uint8Array(iv.length + encryptedArray.length);
    combined.set(iv);
    combined.set(encryptedArray, iv.length);

    return btoa(String.fromCharCode(...combined));
}

export async function decryptValue(encryptedBase64: string): Promise<string> {
    try {
        const enc = new TextEncoder();
        const keyMaterial = await window.crypto.subtle.importKey(
            "raw",
            enc.encode(ENCRYPTION_KEY.padEnd(32).slice(0, 32)),
            "AES-GCM",
            false,
            ["decrypt"]
        );

        const combined = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));
        const iv = combined.slice(0, 12);
        const data = combined.slice(12);

        const decrypted = await window.crypto.subtle.decrypt(
            { name: "AES-GCM", iv },
            keyMaterial,
            data
        );

        return new TextDecoder().decode(decrypted);
    } catch (e) {
        console.error('Decryption failed:', e);
        return ''; // Return empty if decryption fails
    }
}
