import karin, { render, segment, restart, Update, common } from 'node-karin'
import { Render, Version, Common } from '@/module'
import { markdown } from '@karinjs/md-html'
import fs from 'node:fs'
import { execSync } from 'node:child_process'

export const help = karin.command(/^#?(kkk)?帮助$/, async (e) => {
  const img = await Render('help/index')
  await e.reply(img)
  return true
}, { name: 'kkk-帮助' })

export const version = karin.command(/^#?kkk版本$/, async (e) => {
  const changelogs = fs.readFileSync(Version.pluginPath + '/CHANGELOG.md', 'utf8')
  const html = markdown(changelogs, {
    gitcss: Common.useDarkTheme() ? 'github-markdown-dark.css' : 'github-markdown-light.css'
  })
  const htmlPath = `${Version.karinPath}/temp/html/${Version.pluginName}/help/version.html`
  fs.writeFileSync(htmlPath, html)
  const img = await render.renderHtml(htmlPath)
  await e.reply(segment.image(img))
  return true
}, { name: 'kkk-版本' })

export const changelogs = karin.command(/^#?kkk更新日志$/, async (e) => {
  const commits = getLatestCommitsSync()
  let htmlString = ''

  for (const commit of commits) {
    htmlString += `
<div align="center" style="padding: 3em; border: ${setColor(commit.message)}; border-radius: 0 50px 25px 100px;">
<p align="left" style="font-size: 1.5em; font-weight: 700;">${commit.message}</p>
<p align="right" style="font-size: 1.15em">COMMITTER: ${commit.committer}</p>
<p align="right" style="font-size: 1em">SHA: ${commit.sha}</p>
</div><br>
`
  }
  const html = markdown(htmlString, {
    gitcss: Common.useDarkTheme() ? 'github-markdown-dark.css' : 'github-markdown-light.css'
  })
  const htmlPath = `${Version.karinPath}/temp/html/${Version.pluginName}/help/changelogs.html`
  fs.writeFileSync(htmlPath, html)
  const img = await render.renderHtml(htmlPath)
  await e.reply(segment.image(img))
  return true
}, { name: 'kkk-更新日志', permission: 'master' })

export const update = karin.command(/^#?kkk更新$/, async (e) => {
  let [ name, cmd ] = [ Version.pluginName, 'git pull' ]
  if (e.msg.includes('强制')) cmd = 'git reset --hard && git pull --allow-unrelated-histories'
  const { data, status } = await Update.update(Version.pluginPath, cmd)
  await e.bot.sendForwardMessage(e.contact, common.makeForward([ segment.text(`更新${name}...${data}`) ], e.sender.uid, e.sender.nick))
  if (status === 'ok') {
    try {
      await e.reply(`\n更新完成，开始重启 本次运行时间：${common.uptime()}`, { at: true })
      await restart(e.self_id, e.contact, e.message_id)
      return true
    } catch (error) {
      await e.reply(`${Version.pluginName}重启失败，请手动重启以应用更新！`)
    }
  }
  return true
}, { name: 'kkk-更新', permission: 'master' })

interface CommitLog {
  sha: string
  committer: string
  message: string
}

const getLatestCommitsSync = (): CommitLog[] => {
  const command = 'git log -150 --pretty=format:"%h %an %s"'
  const output = execSync(command, { cwd: Version.pluginPath }).toString()

  // 将输出分割成数组，每一项是一个commit记录
  const commits: string[] = output.trim().split('\n')

  return commits.map((commit) => {
    // 分割SHA和其他信息
    const [ sha, ...rest ] = commit.split(' ')
    // 找到冒号的位置，分割提交者和提交信息
    const spaceIndex = rest.findIndex(word => word.includes(':'))
    const committerAndMessage = rest.slice(0, spaceIndex)
    const committer = committerAndMessage.join(' ')
    const message = rest.slice(spaceIndex).join(' ').replace(/^:/, '').trim() // 修复：移除冒号
    return { sha, committer, message }
  }).slice(0, 50) // 只取前30个commit
}

const setColor = (message: string): string => {
  switch (true) {
    case message.includes('feat'):
      return '10px solid #a9ffb9'
    case message.includes('fix'):
      return '10px solid #ffe96e;'
    case message.includes('perf'):
      return '10px solid #928eff'
    case message.includes('refactor'):
      return '10px solid #ff3b3b'
    default:
      return '2px solid'
  }
}