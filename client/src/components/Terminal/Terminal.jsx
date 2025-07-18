import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [prevCommands, setPrevCommands] = useState([]);
  const [count, setCount] = useState(0);
  const scrollContainerRef = useRef();
  const navigate = useNavigate();

  // const commands = ["cd", "nexus", "ls", "cls", "exit", "register"];
  const nexusPages = [
    "home",
    "team",
    "achievements",
    "events",
    "forms",
    "connect",
    "projects",
    "coding",
    "interview-experiences",
    "about",
  ];
  // const nexusSubcommands = ["--help", "about"];

  useEffect(() => {
    // Scroll to the bottom when the component mounts or when new content is added
    scrollContainerRef.current.scrollTop =
      scrollContainerRef.current.scrollHeight;
  }, [prevCommands]); // Assuming prevCommands is the array of terminal outputs

  const handleInputChange = (e) => setInput(e.target.value);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const output = terminalFunction(input);
    setCount(count + 1);

    if (output === 0) {
      setPrevCommands([]);
    } else {
      setPrevCommands((prev) => [...prev, { input, output }]);
    }

    setInput("");
  };

  const codingValidate = (args) => {
    const platforms = ["codeforces", "codechef", "leetcode"];
    const branches = ["CS", "AI"];
    const codingProfile = {
      search: undefined,
      year: undefined,
      branch: undefined,
      platform: undefined,
      status: undefined,
    };

    if (args.length === 2) return "/coding";

    for (let i = 2; i < args.length; i += 2) {
      const flag = args[i];
      const value = args[i + 1];

      switch (flag) {
        case "-s":
          codingProfile.search = value;
          break;
        case "-y":
          codingProfile.year = parseInt(value) % 2000;
          break;
        case "-p":
          if (!platforms.includes(value.toLowerCase()))
            return "platformUndefined";
          codingProfile.platform = value.toLowerCase();
          break;
        case "-b":
          if (!branches.includes(value.toUpperCase())) return "branchUndefined";
          codingProfile.branch = value.toUpperCase();
          break;
        case "-a":
          codingProfile.status =
            value === "0" ? "current" : value === "1" ? "alumni" : undefined;
          break;
        default:
          return "filterUndefined";
      }
    }

    const params = new URLSearchParams();
    for (const key in codingProfile) {
      if (codingProfile[key] !== undefined) {
        params.append(key, codingProfile[key]);
      }
    }

    return `/coding?${params.toString()}`;
  };

  const terminalFunction = (inputStr) => {
    // splitting the input with to check whether it is correct command or not
    const args = inputStr.trim().split(" ");
    const [command, ...rest] = args;

    // iterating through commands whether it matches any of the commands in the list
    switch (command) {
      case "": //no input given
        return;

      case "cd":
        if (args.length % 2 === 0 && args[1] === "coding") {
          //particularly if its coding page, using seperate flags on it
          const path = codingValidate(args);
          switch (path) {
            case "platformUndefined": //when -p tag is used incorrectly
              return (
                <ErrorMsg text="Platform does not exist. Use codeforces, leetcode or codechef." />
              );
            case "branchUndefined": //when -b tag is used incorrectly
              return <ErrorMsg text="Branch does not exist. Use CS or AI." />;
            case "filterUndefined": //if an invalid tag is used
              return (
                <ErrorMsg text='Wrong Command. Ask "nexus --help" for commands.' />
              );
            default:
              navigate(path); //redirect to the coding page with query params
              return <div className="mt-0.5" />;
          }
        } else if (args.length === 2 && nexusPages.includes(args[1])) {
          navigate(`/${args[1]}`); // redirect to the args[1] page
          return <div className="mt-0.5" />;
        } else if (args.length === 2) {
          return <ErrorMsg text={`Page ${args[1]} doesn't exist.`} />;
        } else {
          return (
            <ErrorMsg text='Wrong Command. Ask "nexus --help" for commands.' />
          );
        }

      case "nexus":
        switch (args[1]) {
          case "--help":
            return <HelpMessage />;
          case "about":
            return <SimpleMsg text="Nexus About" />;
          default:
            return (
              <ErrorMsg text='Wrong Command. Ask "nexus --help" for commands.' />
            );
        }

      case "ls":
        return args.length === 1 ? (
          <PageList />
        ) : (
          <ErrorMsg text='Wrong Command. Ask "nexus --help" for commands.' />
        );

      case "cls":
        return args.length === 1 ? (
          0
        ) : (
          <ErrorMsg text='Wrong Command. Ask "nexus --help" for commands.' />
        );

      case "register":
        return args.length === 2 ? (
          <ErrorMsg text={`Event ${args[1]} is not accepting`} />
        ) : (
          <ErrorMsg text='Wrong Command. Ask "nexus --help" for commands.' />
        );

      default:
        return (
          <ErrorMsg text='Wrong Command. Ask "nexus --help" for commands.' />
        );
    }
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 ">
      <h2 className="text-2xl font-semibold">$ Nexus Terminal</h2>
      <p className="text-gray-400 text-base md:text-[1.25rem]">
        Interact to know more about Nexus...
      </p>
      <div className="flex h-[50vh] w-[90%] flex-col overflow-y-auto rounded-2xl bg-white/95 text-black md:h-[75vh] md:w-[70vw] ">
        <div className="flex h-10 list-none items-center gap-2 bg-black/25 pl-6">
          <li className="h-4 w-4 rounded-full bg-red-600"></li>
          <li className="h-4 w-4 rounded-full bg-yellow-300"></li>
          <li className="h-4 w-4 rounded-full bg-green-600"></li>
        </div>

        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
          {/* Existing terminal outputs */}
          {prevCommands.map((command, index) => (
            <div
              key={index}
              className="text-orange-500 px-4 py-2 font-semibold"
            >
              <div className="mb-0.5">
                <p className="text-orange-500 text-xs md:text-base">
                  SVNIT/DoCSE \& DoAI/Nexus/User:~${command.input}
                </p>
              </div>
              {/* <div className='mt-0.5'><p>{command.output}</p></div> */}
              {command.output}
            </div>
          ))}

          {/* Form for new input */}
          <form onSubmit={handleTerminalSubmit}>
            <div className="text-orange-500 flex px-4 py-2 font-semibold ">
              <p className="text-orange-500 text-xs md:text-base">
                SVNIT/DoCSE \& DoAI/Nexus/User:~$
              </p>
              <input
                type="text"
                placeholder={count === 0 ? "nexus --help " : null}
                value={input}
                onChange={handleInputChange}
                className="ml-1 w-full basis-1/2 border-none bg-transparent text-xs outline-none md:text-base"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Components

const HelpMessage = () => (
  <div className="mt-0.5 flex flex-col gap-2 text-xs md:text-sm">
    <p>
      The Nexus Terminal lets you navigate the website via command-line
      interface. Use the following commands:
    </p>
    {[
      ["cd home", "Redirect to Home Page"],
      ["cd [page]", "Redirect to a particular page"],
      ["cd coding", ""],
      ["", "-s: Search user"],
      ["", "-b: Filter by branch (CS/AI)"],
      ["", "-a: Filter by status (0=current, 1=alumni)"],
      ["", "-p: Platform (codeforces/codechef/leetcode)"],
      ["", "-y: Year"],
      ["cls", "Clear terminal"],
      ["ls", "List available pages"],
    ].map(([cmd, desc], i) => (
      <div key={i} className="flex gap-4">
        <span className="text-teal-300">{cmd}</span>
        <span>{desc}</span>
      </div>
    ))}
  </div>
);

const PageList = () => (
  // list of all pages of nexus
  <div className="mt-0.5 flex flex-col gap-2 text-xs md:text-sm">
    {[
      ["cd home", "You are here"],
      "cd team",
      "cd achievements",
      "cd events",
      "cd forms",
      "cd connect",
      "cd projects",
      "cd coding",
      "cd interview-experiences",
      "cd about",
    ].map((item, i) =>
      Array.isArray(item) ? (
        <div key={i} className="flex gap-4">
          <span className="text-teal-300">{item[0]}</span>
          <span>{item[1]}</span>
        </div>
      ) : (
        <div key={i}>{item}</div>
      ),
    )}
  </div>
);

const ErrorMsg = ({ text }) => (
  <div className="mt-0.5 text-red-900">
    <p>{text}</p>
  </div>
);

const SimpleMsg = ({ text }) => (
  <div className="mt-0.5">
    <p>{text}</p>
  </div>
);

export default Terminal;
