//受け取った値を出力する関数
const printLine = (text: string, breakline: boolean = true) => {
    process.stdout.write(text + (breakline ? '\n' : ''))
}

//ユーザーに質問を投げかけ入力してもらう関数
const promptInput = async (text: string) => {
    printLine(`\n${text}\n`, false)
    const input: string = await new Promise((resolve) => process.stdin.once('data', (data) => resolve(data.toString())))

    return input.trim()
}

(async () => {
    const name = await promptInput('What is your name?')
    console.log(name)
    const age = await promptInput('What is your age?')
    console.log(age)
    process.exit()
})()