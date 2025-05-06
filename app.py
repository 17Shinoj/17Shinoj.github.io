import streamlit as st
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain_community.chat_models import ChatOpenAI
import os

# Fetch API keys from environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Define functions for better code organization
@st.cache_data
def read_pdf(file):
    try:
        pdf_reader = PdfReader(file)
        text = "".join([page.extract_text() for page in pdf_reader.pages])
        return text
    except Exception as e:
        st.error(f"Error reading PDF: {e}")
        return None

def split_text_into_chunks(text, chunk_size=1000, chunk_overlap=150):
    text_splitter = RecursiveCharacterTextSplitter(
        separators="\n",
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        length_function=len
    )
    return text_splitter.split_text(text)

def init_embeddings(api_key):
    return OpenAIEmbeddings(openai_api_key=api_key)

def create_vector_store(chunks, embeddings):
    return FAISS.from_texts(chunks, embeddings)

def generate_response(question, vector_store, llm):
    match = vector_store.similarity_search(question)
    chain = load_qa_chain(llm, chain_type="stuff")
    response = chain.run(input_documents=match, question=question)
    return response

# Streamlit UI components
st.header("My first Chatbot")
with st.sidebar:
    st.title("Your Documents")
    file = st.file_uploader("Upload a PDF file and start asking questions", type="pdf")

if file:
    with st.spinner('Processing PDF...'):
        text = read_pdf(file)
    
    if text:
        chunks = split_text_into_chunks(text)
        embeddings = init_embeddings(OPENAI_API_KEY)
        vector_store = create_vector_store(chunks, embeddings)
        
        user_question = st.text_input("Type Your question here")
        if user_question:
            llm = ChatOpenAI(
                openai_api_key=OPENAI_API_KEY,
                temperature=0,
                max_tokens=1000,
                model_name="gpt-3.5-turbo"
            )
            response = generate_response(user_question, vector_store, llm)
            st.write(response)
