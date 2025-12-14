#!/bin/bash
# Script de configuration initiale du Raspberry Pi
# A executer une seule fois sur le Pi

set -e

echo "=== Configuration du Raspberry Pi pour Los Nachos Chipies ==="

# Update system
echo "Mise a jour du systeme..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
echo "Installation de Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node installation
echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"

# Install PM2 globally
echo "Installation de PM2..."
sudo npm install -g pm2

# Setup PM2 to start on boot
echo "Configuration de PM2 pour demarrer au boot..."
pm2 startup systemd -u $USER --hp /home/$USER
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp /home/$USER

# Install Nginx
echo "Installation de Nginx..."
sudo apt install -y nginx

# Install Certbot for SSL
echo "Installation de Certbot..."
sudo apt install -y certbot python3-certbot-nginx

# Create app directory
echo "Creation du repertoire de l'application..."
mkdir -p /home/$USER/postaposite

# Copy Nginx config
echo "Configuration de Nginx..."
sudo cp /home/$USER/postaposite/nginx.conf /etc/nginx/sites-available/postaposite
sudo ln -sf /etc/nginx/sites-available/postaposite /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx

echo ""
echo "=== Configuration terminee! ==="
echo ""
echo "Prochaines etapes:"
echo "1. Obtenir un certificat SSL:"
echo "   sudo certbot --nginx -d losnachoschipies.fr -d www.losnachoschipies.fr"
echo ""
echo "2. Configurer les secrets GitHub:"
echo "   - PI_HOST: L'IP ou hostname de ton Pi"
echo "   - PI_USERNAME: Ton nom d'utilisateur (probablement 'pi')"
echo "   - PI_SSH_KEY: Ta cle SSH privee"
echo "   - PI_PORT: Le port SSH (generalement 22)"
echo ""
echo "3. Generer une cle SSH pour GitHub Actions:"
echo "   ssh-keygen -t ed25519 -C 'github-actions' -f ~/.ssh/github_actions"
echo "   cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys"
echo "   cat ~/.ssh/github_actions  # Copier cette cle dans PI_SSH_KEY"
