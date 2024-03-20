const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// Channel ID yang diizinkan untuk perintah !id dirt
const allowedChannelId = "1217471503860502628"; // Ganti channel_id dengan ID saluran yang diizinkan

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}\n` + new Date());
});

client.on("messageCreate", (message) => {
  // Periksa apakah pesan dikirim dari saluran yang diizinkan dan memulai dengan perintah !id

  if (
    message.channel.id === allowedChannelId &&
    message.content.startsWith("!id ")
  ) {
    // Ekstrak kata kunci dari pesan
    let keyword = message.content.split(" ").slice(1).join(" ") + " ";

    // Baca data dari file ItemID.txt
    fs.readFile("ItemID.txt", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      // Pisahkan data menjadi baris-baris
      const lines = data.split("\n");
      // Cari id dan nama item yang sesuai dengan kata kunci
      let found = false;
      let msg = "";
      for (const line of lines) {
        const [id, name] = line.split(":");
        if (name) {
          let src = name.toLowerCase();
          if (src && src.includes(keyword.toLowerCase())) {
            msg += `* Nama Item: **${name}**- ID: \`${id.trim()}\`\n`;
            found = true;
          }
        }
      }
      // Jika tidak ada item yang cocok dengan kata kunci
      if (found) {
        message.channel.send("## " + keyword + "\n" + msg);
      } else {
        message.channel.send(
          `Tidak dapat menemukan item dengan kata kunci "${keyword}"`,
        );
      }
    });
  }
});

client.login(
  "MTE4MTIwMTMyMTk5MTM0NDEyOA.GuH8ZA.fCtQULuei-dHWGfRZ-I6PbRPXrztZdnHdCj4PA",
);
