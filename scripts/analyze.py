from transformers import T5Tokenizer, T5ForConditionalGeneration
import re
model = T5ForConditionalGeneration.from_pretrained('t5-base')
tokenizer = T5Tokenizer.from_pretrained('t5-base')

def get_summary(tweet_data):
    text = " ".join(tweet_data)
    TEXT_CLEANING_RE = "@\S+|https?:\S+|http?:\S|[^A-Za-z0-9]+"
    text = re.sub(TEXT_CLEANING_RE, ' ', str(text).lower()).strip()
    Preprocessed_text = "summarize: "+text
    tokens_input = tokenizer.encode(Preprocessed_text,return_tensors="pt", max_length=512, truncation=True)
    summary_ids = model.generate(tokens_input,
                                min_length=60,
                                max_length=250,
                                length_penalty=4.0)

    summary = tokenizer.decode(summary_ids[0])
    cleanr = re.compile('<.*?>')
    summary = re.sub(cleanr, '', summary)
    print(summary)
    return summary