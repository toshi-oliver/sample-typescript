class HitAndBlow {
    answerSource = ['0','1','2','3','4','5','6','7','8','9']
    answer : string[] = []
    tryCount = 0

    setting() {
        const answerLength = 3

        while (this.answer.length < answerLength) {
            const randNum = Math.floor(Math.random() * this.answerSource.length)
            const selectedItem = this.answerSource[randNum]
            if (!this.answer.includes(selectedItem)) {
                this.answer.push(selectedItem)
            }
        }
    }

    async play() {
        const inputArr = (await promptInput('「,」区切りで3つの数字を入力してください')).split('')
        const result = this.check(inputArr)

        if (result.hit !== this.answer.length) {
            //不正解だったら続ける
            printLine(`---\nHit: ${result.hit}\nBlow: ${result.blow}\n---`)
            this.tryCount += 1
            await this.play()
        } else {
            //正解だったら終了
            this.tryCount += 1
        }
    }

    check(inputArr: string[]) {
        let hitCount = 0
        let blowCount = 0

        inputArr.forEach((val, index) => {
            if (val === this.answer[index]) {
                hitCount += 1
            } else if (this.answer.includes(val)) {
                blowCount += 1
            }
        })

        return {
            hit: hitCount,
            blow: blowCount,
        }
    }
}

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

(async ()  => {
    const hitAndBlow = new HitAndBlow()
    hitAndBlow.setting()
    await hitAndBlow.play()
})()