// sw.js

self.addEventListener('notificationclick', event => {
  event.notification.close();

  const gameUrl = 'https://www.roblox.com/games/126884695634066/Grow-a-Garden';

  event.waitUntil(
    // Check all open windows/tabs under this SW’s scope
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (const client of windowClients) {
        // If one already has the Grow a Garden URL, just focus it
        if (client.url === gameUrl && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise, open a new window/tab (or trigger the Roblox app on mobile)
      return clients.openWindow(gameUrl);
    })
  );
});
