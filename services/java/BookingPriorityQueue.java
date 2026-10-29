import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.PriorityQueue;

/** Orders synthetic teacher requests by urgency, then stable arrival order. */
public final class BookingPriorityQueue {
    private record Request(int priority, int sequence, String id) {}

    public static void main(String[] args) throws Exception {
        PriorityQueue<Request> queue = new PriorityQueue<>(
            (left, right) -> left.priority() != right.priority()
                ? Integer.compare(left.priority(), right.priority())
                : Integer.compare(left.sequence(), right.sequence())
        );
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(System.in))) {
            String line;
            int sequence = 0;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split("\\t", 2);
                if (parts.length != 2) continue;
                int priority = switch (parts[0]) {
                    case "urgent" -> 0;
                    case "standard" -> 1;
                    default -> 2;
                };
                queue.add(new Request(priority, sequence++, parts[1]));
            }
        }
        while (!queue.isEmpty()) System.out.println(queue.remove().id());
    }
}
