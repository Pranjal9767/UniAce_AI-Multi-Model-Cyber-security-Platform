import os
import logging
from transformers import pipeline

logger = logging.getLogger(__name__)

class ModelManager:
    _instances = {}

    @classmethod
    def get_email_model(cls):
        if "email" not in cls._instances:
            logger.info("Loading Email Phishing Model (DeBERTa)...")
            # In a real environment, we would load 'microsoft/deberta-v3-base' fine-tuned for phishing
            # Using a tiny text classification model for demonstration to save memory/disk
            cls._instances["email"] = pipeline("text-classification", model="nlptown/bert-base-multilingual-uncased-sentiment")
        return cls._instances["email"]

    @classmethod
    def get_sms_model(cls):
        if "sms" not in cls._instances:
            logger.info("Loading SMS Phishing Model (DistilBERT)...")
            # Similarly, using a fallback for demonstration
            cls._instances["sms"] = pipeline("text-classification", model="distilbert-base-uncased-finetuned-sst-2-english")
        return cls._instances["sms"]

    @classmethod
    def get_url_model(cls):
        if "url" not in cls._instances:
            logger.info("Loading URL Phishing Model (XGBoost)...")
            # Stub for XGBoost model
            cls._instances["url"] = "mock_xgboost_model_loaded"
        return cls._instances["url"]

    @classmethod
    def get_deepfake_image_model(cls):
        if "df_image" not in cls._instances:
            logger.info("Loading Deepfake Image Model (EfficientNet)...")
            # Stub for Deepfake image model
            cls._instances["df_image"] = "mock_efficientnet_model_loaded"
        return cls._instances["df_image"]

    @classmethod
    def get_deepfake_video_model(cls):
        if "df_video" not in cls._instances:
            logger.info("Loading Deepfake Video Model (FTCN)...")
            # Stub for Deepfake video model
            cls._instances["df_video"] = "mock_ftcn_model_loaded"
        return cls._instances["df_video"]
