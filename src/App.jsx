import { useState } from "react";

function App() {
  const [numbers] = useState("1234567890");
  const [lowerCase] = useState("abcdefghijklmnopqrstuvwxyz");
  const [upperCase] = useState("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  const [specialChars] = useState("!@#$%^&*()-_=+[]{}");

  const [passLength, setPassLength] = useState(8);
  const [includeUpper, setIncludeUpper] = useState(false);
  const [includeLower, setIncludeLower] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecial, setIncludeSpecial] = useState(false);

  const [password, setPassword] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const [error, setError] = useState("");

  const handleRangeChange = (e) => {
    setPassLength(Number(e.target.value));
  };

  // Wraps each checkbox's onChange so picking an option also clears
  // any existing validation message, instead of leaving it stuck.
  const handleOptionChange = (setter) => (e) => {
    setter(e.target.checked);
    if (error) setError("");
  };

  const generatePassword = (e) => {
    e.preventDefault();
    let chars = "";

    if (includeUpper) chars += upperCase;
    if (includeLower) chars += lowerCase;
    if (includeNumbers) chars += numbers;
    if (includeSpecial) chars += specialChars;

    if (chars === "") {
      setError("Select at least one character type to generate a password.");
      return;
    }

    setError("");

    let generatedPassword = "";
    for (let i = 0; i < passLength; i++) {
      const index = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[index];
    }

    setPassword(generatedPassword);
    setCopyMessage("");
  };

  const copyPassword = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopyMessage(" Copied!");
  };

  return (
    <div className="min-h-screen bg-[#161B26] flex items-center justify-center px-4 py-12 font-sans">
      <div className="w-full max-w-md rounded-lg border border-[#2E3648] bg-[#1E2433] p-8">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight text-[#EDEAE3]">
          Random Password Generator
        </h1>

        <form onSubmit={generatePassword} className="space-y-6">
          <div>
            <label
              htmlFor="pLength"
              className="mb-2 flex items-baseline justify-between text-sm text-[#8791A6]"
            >
              <span>Password Length</span>
              <span className="font-mono text-[#EDEAE3]">{passLength}</span>
            </label>
            <input
              type="range"
              name="pLength"
              id="pLength"
              min={8}
              max={64}
              value={passLength}
              onChange={handleRangeChange}
              className="w-full cursor-pointer accent-[#E8A33D]"
            />
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-md border border-[#2E3648] p-4">
            <label htmlFor="upper" className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                name="upper"
                id="upper"
                checked={includeUpper}
                onChange={handleOptionChange(setIncludeUpper)}
                className="size-4 cursor-pointer rounded accent-[#E8A33D]"
              />
              <span className="text-sm text-[#EDEAE3]">Uppercase Letters</span>
            </label>

            <label htmlFor="lower" className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                name="lower"
                id="lower"
                checked={includeLower}
                onChange={handleOptionChange(setIncludeLower)}
                className="size-4 cursor-pointer rounded accent-[#E8A33D]"
              />
              <span className="text-sm text-[#EDEAE3]">Lowercase Letters</span>
            </label>

            <label htmlFor="numbers" className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                name="numbers"
                id="numbers"
                checked={includeNumbers}
                onChange={handleOptionChange(setIncludeNumbers)}
                className="size-4 cursor-pointer rounded accent-[#E8A33D]"
              />
              <span className="text-sm text-[#EDEAE3]">Numbers</span>
            </label>

            <label htmlFor="specChar" className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                name="specChar"
                id="specChar"
                checked={includeSpecial}
                onChange={handleOptionChange(setIncludeSpecial)}
                className="size-4 cursor-pointer rounded accent-[#E8A33D]"
              />
              <span className="text-sm text-[#EDEAE3]">Special Characters</span>
            </label>
          </div>

          {error && <p className="text-sm text-[#E2725B]">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-md bg-[#E8A33D] py-2.5 font-medium text-[#161B26] transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E2433] active:brightness-90"
          >
            Generate Password
          </button>
        </form>

        <div className="mt-8 border-t border-[#2E3648] pt-6">
          <div className="flex gap-2">
            <input
              type="text"
              name="output"
              id="output"
              size={40}
              value={password}
              readOnly
              placeholder="Your password will appear here"
              className="min-w-0 flex-1 rounded-md border border-[#2E3648] bg-[#161B26] px-3 py-2 font-mono text-sm text-[#EDEAE3] placeholder:text-[#5B6478] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]"
            />
            <button
              type="button"
              onClick={copyPassword}
              disabled={!password}
              className="shrink-0 rounded-md border border-[#2E3648] px-4 py-2 text-sm font-medium text-[#EDEAE3] transition hover:bg-[#2E3648] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D]"
            >
              Copy Password
            </button>
          </div>
          {copyMessage && (
            <span id="copyMsg" className="mt-2 block text-sm text-[#E8A33D]">
              {copyMessage}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;