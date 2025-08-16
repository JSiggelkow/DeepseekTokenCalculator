import re

from fastapi import FastAPI, File, UploadFile, HTTPException
from transformers import AutoTokenizer
from pdfminer.high_level import extract_text
from pathlib import Path
from io import BytesIO

app = FastAPI(title="Tiny PDF Token Counter for Deepseek")

chat_tokenizer_dir = "./tokenizer"

tokenizer = AutoTokenizer.from_pretrained(
    chat_tokenizer_dir, trust_remote_code=True
)


def normalize_ws(s: str) -> str:
    return re.sub(r"\s+", " ", s).strip()


@app.post("/api/tokens")
async def tokens(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Invalid file type")

    data = await file.read()

    text = extract_text(BytesIO(data)) or ""
    text = normalize_ws(text)

    ids = tokenizer.encode(text, add_special_tokens=False)
    return {"model": "deepseek-ai/DeepSeek-V3", "file_name": file.filename, "token_count": len(ids)}