from better_profanity import profanity
from typing import Optional

# Define custom bad words (including Filipino)
CUSTOM_BADWORDS = [
    # Filipino bad words
    "putang", "puta", "gago", "tangina", "tanginamo", "putangina", "inamo", "ulol", 
    "bobo", "tanga", "pakyu", "pakyo", "punyeta", "kupal", "tarantado", "leche", 
    "letse", "ogag", "hinayupak", "hayop", "hayup", "kingina", "pakshet", "shunga",
    # Word variations
    "ptngina", "pu tang ina", "p tang ina", "putang ina",
    "tngina", "tang ina", "tangena",
    "g@go", "g@g0", "g@gu",
    "b0b0", "b0bo", "bob0"
]

# Initialize the profanity filter with custom words
profanity.load_censor_words()
profanity.add_censor_words(CUSTOM_BADWORDS)

def contains_bad_words(text: Optional[str]) -> bool:
    """
    Check if text contains profanity.
    """
    if not text:
        return False
    return profanity.contains_profanity(text)

def filter_bad_words(text: Optional[str]) -> str:
    """
    Filter out profanity from text.
    Returns censored text with the first and last letter visible.
    Example: "asshole" -> "a****e"
    """
    if not text:
        return text

    # Split text into words
    words = text.split()
    result = []
    
    for word in words:
        # Check if the word is profane
        if profanity.contains_profanity(word):
            if len(word) <= 2:
                result.append('*' * len(word))
            else:
                result.append(f"{word[0]}{'*' * (len(word)-2)}{word[-1]}")
        else:
            result.append(word)
    
    return ' '.join(result)