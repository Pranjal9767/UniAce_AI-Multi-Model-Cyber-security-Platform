import logging

logger = logging.getLogger(__name__)

class ModelManager:
    _instances = {}

    @classmethod
    def get_email_model(cls):
        return "email_model"

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
