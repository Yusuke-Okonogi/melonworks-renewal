import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { company, name, email, tel, type, message, bot_field } = body;

    // 【サーバー側スパム対策】ハニーポットに値が入っていたら即終了
    if (bot_field) {
      return NextResponse.json({ success: false, message: "Spam detected" });
    }

    // 1. トランスポーターの作成
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // 587番ポートの場合はfalse, 465番ならtrue
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 2. メロンワークス側への通知メール
    const adminMailOptions = {
      from: `"${name}様" <${process.env.SMTP_USER}>`, 
      to: "hello@melonworks.me", // 受信先
      replyTo: email, 
      subject: `【HP問い合わせ】${name}様より`,
      text: `
ウェブサイトよりお問い合わせがありました。

■お名前: ${name}
■会社名: ${company || "なし"}
■メール: ${email}
■電話番号: ${tel || "なし"}
■ご相談内容: ${type}

■詳細メッセージ:
${message}
      `,
    };

    // 3. ユーザーへの自動返信メール
    const userMailOptions = {
      from: `"メロンワークス合同会社" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "【自動返信】お問い合わせありがとうございます",
      text: `
${name} 様

この度はメロンワークスへお問い合わせいただき、誠にありがとうございます。
以下の内容で受け付けいたしました。

担当者より、通常1〜2営業日以内に折り返しご連絡させていただきます。
今しばらくお待ちくださいますようお願い申し上げます。

--------------------------------------------------
■お問い合わせ内容
--------------------------------------------------
ご相談内容: ${type}
詳細メッセージ:
${message}
--------------------------------------------------

※お急ぎの場合は、027-898-2667 までお電話にてご連絡ください。

==================================================
メロンワークス合同会社 (Melon Works LLC)
Web: https://melonworks.me
Email: hello@melonworks.me
==================================================
      `,
    };

    // メール送信実行
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Mail Send Error:", error);
    return NextResponse.json({ success: false, message: "送信に失敗しました" }, { status: 500 });
  }
}