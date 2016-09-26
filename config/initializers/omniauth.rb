OmniAuth.config.logger = Rails.logger
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, Figaro.env.google_client_id, Figaro.env.google_client_secret, {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}, skip_jwt: true }}
#  provider :google_oauth2, '625104604997-jot88nivuidg6ntmf3hnlrfdeg7cvdcd.apps.googleusercontent.com', 'ToojjBOLb9vUwTFrdZ6HC_g0', {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}

end


#'570001027303-n8qq540ubuo66hddec2jlkkstmd07rd5.apps.googleusercontent.com'
#google_client_secret: '5OJdbwFoWBsbnGBMJbbDwAmB'
