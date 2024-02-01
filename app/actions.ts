"use server";

// import { promisify } from "util";
// import { exec } from "child_process";

// const execPromise = promisify(exec);

// const getPythonCommand = async () => {
//     const { stdout: python3Stdout } = await execPromise("python3 --version").catch(({ stdout }) => ({ stdout }));
//     const python3 = python3Stdout ? "python3" : "python";
//     const { stdout: pythonStdout } = await execPromise("python --version").catch(({ stdout }) => ({ stdout }));
//     const python = pythonStdout ? "python" : python3;

//     return python;
// };

export async function compilePy(prevState: any, formData: FormData) {
    // const code = formData.get("code");
    // const python = await getPythonCommand();
    // const pythonCmd = `${python} -c "${code}"`;
    // const runResult = await execPromise(pythonCmd).catch((val) => ({ stdout: val.stderr, stderr: val.stderr }));

    // return {
    //     result: runResult.stderr ? runResult.stderr : runResult.stdout,
    //     message: "Python code executed successfully",
    //     success: runResult.stderr ? false : true
    // };
    return {
        result: "oke gas nomor 2",
        message: "Python code executed successfully",
        success: true
    };
}
