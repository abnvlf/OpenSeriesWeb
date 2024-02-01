import { promisify } from "util";
import { exec } from "child_process";

const execPromise = promisify(exec);

const getPythonCommand = async () => {
    const { stdout: python3Stdout } = await execPromise("python3 --version").catch(({ stdout }) => ({ stdout }));
    const python3 = python3Stdout ? "python3" : "python";
    const { stdout: pythonStdout } = await execPromise("python --version").catch(({ stdout }) => ({ stdout }));
    const python = pythonStdout ? "python" : python3;

    return python;
};

export async function POST(request: Request) {
    const { code } = await request.json();
    const python = await getPythonCommand();
    const pythonCmd = `${python} -c "${code}"`;
    const runResult = await execPromise(pythonCmd).catch((val) => ({ stdout: val.stderr, stderr: val.stderr }));

    return Response.json({
        result: runResult.stderr ? runResult.stderr : runResult.stdout,
        message: "Python code executed successfully",
        success: runResult.stderr ? false : true
    });
}
