from utilities.db.db_manager import dbManager


class ExamplePhotos:
    @staticmethod
    def get_images_urls():
        return [photo.image_url for photo in dbManager.build_fetch_query('example_photos', table_columns=['image_url'])]


example_photos_db = ExamplePhotos()
