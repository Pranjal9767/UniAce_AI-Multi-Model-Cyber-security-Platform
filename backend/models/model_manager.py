import logging
import os

from transformers import pipeline


class SimpleLogger:
    """Light wrapper around logging.Logger to ensure all common methods are implemented."""
    def __init__(self, base: logging.Logger):
        self._base = base

    def debug(self, msg, *args, **kwargs):
        return self._base.debug(msg, *args, **kwargs)

    def info(self, msg, *args, **kwargs):
        return self._base.info(msg, *args, **kwargs)

    def warning(self, msg, *args, **kwargs):
        return self._base.warning(msg, *args, **kwargs)

    warn = warning

    def error(self, msg, *args, **kwargs):
        return self._base.error(msg, *args, **kwargs)

    def critical(self, msg, *args, **kwargs):
        return self._base.critical(msg, *args, **kwargs)

    def exception(self, msg, *args, exc_info=True, **kwargs):
        return self._base.exception(msg, *args, exc_info=exc_info, **kwargs)


logger = SimpleLogger(logging.getLogger(__name__))

class ModelManager:
    _instances = {}

    @classmethod
    def get_email_model(cls):
        if "email" not in cls._instances:
            logger.info("Loading Email Phishing Model...")
            cls._instances["email"] = pipeline(
                "text-classification",
                model="cybersectony/phishing-email-detection-distilbert_v2.4.1",
                use_auth_token=os.getenv("HF_TOKEN")
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
