from utilities.db.db_manager import dbManager


class ContactUs:
    CONTACT_COLS = ['phone', 'email', 'contact_name', 'contact_description']

    def add_contact_request(self, phone, email, name, description):
        return dbManager.build_insert_query('contact_us', self.CONTACT_COLS, [[phone, email, name, description]])


# Create instance for export
contact_us_db = ContactUs()
