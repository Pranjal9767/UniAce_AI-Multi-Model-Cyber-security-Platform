import logging

logger = logging.getLogger(__name__)

class ModelManager:
    _instances = {}

    @classmethod
    def get_email_model(cls):
        import os
import logging
from transformers import pipeline

logger = logging.getLogger(__name__)

class ModelManager:
    _instances = {}

    @classmethod
    def get_email_model(cls):
        if "email" not in cls._instances:
            logger.info("Loading Email Model...")

            cls._instances["email"] = pipeline(
                "text-classification",
                model="ealvaradob/bert-finetuned-phishing",
                token=os.getenv("HF_TOKEN")
            )

        return cls._instances["email"]

    @classmethod
    def get_sms_model(cls):
        return "sms_model"

    @classmethod
    def get_url_model(cls):
        return "url_model"

    @classmethod
    def get_deepfake_image_model(cls):
        return "image_model"

    @classmethod
    def get_deepfake_video_model(cls):
        return "video_model"

    @classmethod
    def get_sms_model(cls):
        return "sms_model"

    @classmethod
    def get_url_model(cls):
        return "url_model"

    @classmethod
    def get_deepfake_image_model(cls):
        return "image_model"

    @classmethod
    def get_deepfake_video_model(cls):
        return "video_model"
