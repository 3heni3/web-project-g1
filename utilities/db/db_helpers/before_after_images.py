from utilities.db.db_manager import dbManager


class BeforeAfterImages:
    @staticmethod
    def get_images_urls():
        return [photo.image_url for photo in
                dbManager.build_fetch_query('before_after_photos',
                                            table_columns=['image_url'])]


before_after_images_db = BeforeAfterImages()
