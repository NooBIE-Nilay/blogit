desc 'drops the db, creates db, migrates db and populates sample data'
task setup: [:environment, 'db:drop', 'db:create', 'db:migrate'] do
  Rake::Task['populate_with_sample_data'].invoke if Rails.env.development?
end

task populate_with_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data in production"
  else
    create_organization!
    create_sample_data!
    puts "sample data has been added."
  end
end

def create_sample_data!
  puts 'Seeding with sample data...'
  create_user! email: 'oliver@example.com', name: 'Oliver', organization: Organization.find_by(name: "Testing Organization")
  create_user! email: 'sam@example.com', name: 'Sam',organization_id:1
  create_user! email: 'oliver@orga.com', name: 'Oliver_OrgA', organization: Organization.find_by(name: "Organization A")
  create_user! email: 'oliver@orgb.com', name: 'Oliver_OrgB', organization: Organization.find_by(name: "Organization B")
  create_user! email: 'oliver@orgc.com', name: 'Oliver_OrgC', organization: Organization.find_by(name: "Organization C")
  puts 'Done! Now you can login with either "oliver@example.com", "oliver@orga.com", "oliver@orgb.com", "oliver@orgc.com"  or "sam@example.com", using password "welcome"'
end

def create_user!(options = {})
  user_attributes = { password: 'welcome', password_confirmation: 'welcome' }
  attributes = user_attributes.merge options
  User.create! attributes
end
def create_organization!(options = {})
  Organization.create!(name: "Testing Organization")
  Organization.create!(name: "Organization A")
  Organization.create!(name: "Organization B")
  Organization.create!(name: "Organization C")
end
