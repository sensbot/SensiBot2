/*
* Thanks For 𝗠𝗵𝗮𝗻𝗸𝗕𝗮𝗿𝗕𝗮𝗿
*/

const
{
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   GroupSettingChange,
   waChatKey,
   mentionedJid,
   processTime,
} = require("@adiwajshing/baileys")
const qrcode = require("qrcode-terminal") //ANAK ASU
const moment = require("moment-timezone") //TOBAT SU
const fs = require("fs") //SU
const { color, bgcolor } = require('./A187ID/color')
const { help } = require('./A187ID/help')
const kagApi = require('@kagchi/kag-api')
const { donasi } = require('./A187ID/donasi')
const { fetchJson } = require('./A187ID/fetcher')
const { recognize } = require('./A187ID/ocr')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./A187ID/functions')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const welkom = JSON.parse(fs.readFileSync('./A187ID/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./A187ID/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./A187ID/simi.json'))
const vcard = 'BEGIN:VCARD\n' // ANAK ANJING MAU NGAPAIN?
            + 'VERSION:3.0\n' // NGAPAIN LAGI KALO GA MAU NUMPANG NAMA DOANG XIXIXIXI
            + 'FN:CO NOEERBOT\n' // MENDING LU TOBAT SU!
            + 'ORG:Creator NOEERBOT;\n' // KASIH CREDITS GUA SU!!!
            + 'TEL;type=CELL;type=VOICE;waid=6285722553839:+62 857-2255-3839\n' // JANGAN KEK BABI SU
            + 'END:VCARD' // ARIS187 ID
prefix = '!'
const speed = require('performance-now')         
blocked = []            
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const arrayBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

const bulan = arrayBulan[moment().format('MM') - 1]

const config = {
    A187: 'ApaJa Bot', // TOBAT SU ASU
    instagram: 'Error', // INFO JANGAN DI UBAH
    nomer: 'wa.me/6281328063545', // INFO SU JNGAN DI UBAH
    youtube: 'Ga Ada', // KINTIL
    whatsapp: 'https://chat.whatsapp.com/CEBTCWw2APwD6EdxOox9wG', // BABI
    tanggal: `TANGGAL: ${moment().format('DD')} ${bulan} ${moment().format('YYYY')}`,
    waktu: time
}

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}


const { tanggal, waktu, instagram, whatsapp, youtube, nomer, ontime } = config



const { exec } = require("child_process")

const client = new WAConnection()

client.on('qr', qr => {
   qrcode.generate(qr, { small: true })
   console.log(`[ ${time} ] QR code is ready, subscribe Aris187 ID`)
})

client.on('credentials-updated', () => {
   const authInfo = client.base64EncodedAuthInfo()
   console.log(`credentials updated!`)

   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t'))
})

fs.existsSync('./session.json') && client.loadAuthInfo('./session.json')

client.connect();

// client.on('user-presence-update', json => console.log(json.id + ' presence is => ' + json.type)) || console.log(`${time}: Bot by ig:@_sadboy.ig`)

client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `𝐇𝐚𝐥𝐥𝐨 @${num.split('@')[0]}\n𝐬𝐞𝐥𝐚𝐦𝐚𝐭 𝐝𝐚𝐭𝐚𝐧𝐠 𝐝𝐢 𝐠𝐫𝐨𝐮𝐩 _*${mdata.subject}*_ `
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `𝐓𝐢𝐭𝐢𝐩 𝐠𝐨𝐫𝐞𝐧𝐠𝐚𝐧 𝐲𝐚𝐡 @${num.split('@')[0]}\n 𝐈 𝐰𝐢𝐥𝐥 𝐦𝐢𝐬𝐬 𝐲𝐨𝐮🏃`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
	client.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('message-new', async (mek) => {
		try {
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			
			const { text, extendedText, contact, location, liveLocation, image, video, stiker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)

			mess = {
				wait: '❬❕❭ 𝐖𝐀𝐈𝐓 𝐏𝐑𝐎𝐒𝐄𝐒',
				success: '️❬ ✅ ❭ 𝐒𝐔𝐂𝐂𝐄𝐒𝐒 𝐊𝐀𝐊🖤',
				error: {
					stick: '𝐘𝐞𝐚𝐡 𝐠𝐚𝐠𝐚𝐥 ;( , 𝐜𝐨𝐛𝐚 𝐥𝐚𝐠𝐢 𝐤𝐚𝐤  ><',
					Iv: '𝗠𝗮𝗮𝗳 𝗹𝗶𝗻𝗸 𝘁𝗶𝗱𝗮𝗸 𝘃𝗮𝗹𝗶𝗱☹️'
				},
				only: {
					group: '𝐌𝐚𝐚𝐟 𝐩𝐞𝐫𝐢𝐧𝐭𝐚𝐡 𝐢𝐧𝐢 𝐡𝐚𝐧𝐲𝐚 𝐛𝐢𝐬𝐚 𝐝𝐢 𝐠𝐮𝐧𝐚𝐤𝐚𝐧 𝐝𝐚𝐥𝐚𝐦 𝐠𝐫𝐨𝐮𝐩',
					ownerG: '𝐌𝐚𝐚𝐟 𝐩𝐞𝐫𝐢𝐧𝐭𝐚𝐡 𝐢𝐧𝐢 𝐡𝐚𝐧𝐲𝐚 𝐛𝐢𝐬𝐚 𝐝𝐢 𝐠𝐮𝐧𝐚𝐤𝐚𝐧 𝐨𝐥𝐞𝐡 𝐨𝐰𝐧𝐞𝐫 𝐠𝐫𝐨𝐮𝐩',
					ownerB: '𝐌𝐚𝐚𝐟 𝐩𝐞𝐫𝐢𝐧𝐭𝐚𝐡 𝐢𝐧𝐢 𝐡𝐚𝐧𝐲𝐚 𝐛𝐢𝐬𝐚 𝐝𝐢 𝐠𝐮𝐧𝐚𝐤𝐚𝐧 𝐨𝐥𝐞𝐡 𝐨𝐰𝐧𝐞𝐫 𝐛𝐨𝐭',
					admin: '𝐌𝐚𝐚𝐟 𝐩𝐞𝐫𝐢𝐧𝐭𝐚𝐡 𝐢𝐧𝐢 𝐡𝐚𝐧𝐲𝐚 𝐛𝐢𝐬𝐚 𝐝𝐢 𝐠𝐮𝐧𝐚𝐤𝐚𝐧 𝐨𝐥𝐞𝐡 𝐚𝐝𝐦𝐢𝐧 𝐠𝐫𝐨𝐮𝐩',
					Badmin: '𝐌𝐚𝐚𝐟 𝐩𝐞𝐫𝐢𝐧𝐭𝐚𝐡 𝐢𝐧𝐢 𝐡𝐚𝐧𝐲𝐚 𝐛𝐢𝐬𝐚 𝐝𝐢 𝐠𝐮𝐧𝐚𝐤𝐚𝐧 𝐣𝐢𝐤𝐚 𝐛𝐨𝐭 𝐦𝐞𝐧𝐣𝐚𝐝𝐢 𝐚𝐝𝐦𝐢𝐧'
				}
			}

			const botNumber = client.user.jid
			const ownerNumber = ["6281328063545@s.whatsapp.net"] // ganti nomer lu
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}

			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			switch(command) {
                                   case 'welcome':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('ketik !welcome on untuk mengaktifkan')
					if (Number(args[0]) === on) {
						if (isWelkom) return reply('fitur aktif')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('❬ Succes ❭ mengaktifkan fitur welcome di grup ini!')
					} else if (Number(args[0]) === off) {
						welkom.splice(from, on)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('❬ Succes ❭ menonaktifkan fitur welcome di grup ini!')
					} else {
						reply('ketik on untuk mengaktifkan, off untuk menonaktifkan fitur')
					}
                                   break
                                      case 'bc': 
					if (!isOwner) return reply(mess.only.ownerB)
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `[Penguman ApaJa Bot]\n\n${body.slice(4)}`})
						}
						reply('𝐬𝐮𝐜𝐜𝐬𝐬 𝐛𝐫𝐨𝐚𝐝𝐜𝐚𝐬𝐭')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `[Penguman ApaJa Bot]\n\n${body.slice(4)}`)
						}
						reply('𝐬𝐮𝐜𝐜𝐬𝐬 𝐛𝐫𝐨𝐚𝐝𝐜𝐚𝐬𝐭')
					}
					break
                                       default:
			if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						console.log(color('[ERROR]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
					}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

                     
/*
*Thanks For 𝗠𝗵𝗮𝗻𝗸𝗕𝗮𝗿𝗕𝗮𝗿
*/

 
