(function() {
    var embed = document.createElement('iframe');
    embed.src = 'https://aruns2008.github.io/calculator/embed.html';
    embed.style.width = '100%';
    embed.style.height = '600px';  // Adjust height as needed
    embed.style.border = 'none';
    var scriptTag = document.currentScript;
    scriptTag.parentNode.insertBefore(embed, scriptTag);
  })();
  