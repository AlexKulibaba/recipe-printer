from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import youtube_transcript_api
from youtube_transcript_api import YouTubeTranscriptApi
import re
import sys

app = FastAPI()

class VideoRequest(BaseModel):
    url: str

def get_video_id(url: str) -> str:
    regex = r"(?:v=|\/)([0-9A-Za-z_-]{11}).*"
    match = re.search(regex, url)
    if match:
        return match.group(1)
    raise ValueError("Invalid YouTube URL")

@app.post("/extract")
async def extract_recipe(request: VideoRequest):
    try:
        video_id = get_video_id(request.url)
        print(f"Extracted Video ID: {video_id}")
        
        print(f"Module file: {youtube_transcript_api.__file__}")
        print(f"YouTubeTranscriptApi contents: {dir(YouTubeTranscriptApi)}")
        
        # Try to instantiate it? Maybe in this version it needs instantiation?
        # instance = YouTubeTranscriptApi()
        # print(f"Instance contents: {dir(instance)}")

        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
        
        full_text = " ".join([item['text'] for item in transcript_list])
        
        return {
            "message": "Transcript extracted successfully",
            "video_id": video_id,
            "raw_transcript_preview": full_text[:500] + "..."
        }

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch transcript: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)