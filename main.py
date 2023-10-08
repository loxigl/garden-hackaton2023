#!/usr/bin/env python3
import os
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes
from jinja2 import FileSystemLoader, Environment
import requests

# load jinja2 tempalates
env = Environment(loader=FileSystemLoader(searchpath="./templates"))

async def sensors(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
#    data = requests.get(f'{os.environ["API_URL"]}/')

    render_values = {
        'temperature': "",
        'humidity': "",
        'immersion': ""
    }

    template = env.get_template("index.j2").render(render_values)

    await update.message.reply_text(template)

app = ApplicationBuilder().token(os.environ["BOT_TOKEN"]).build()

app.add_handler(CommandHandler("sensors", sensors))

app.run_polling()
