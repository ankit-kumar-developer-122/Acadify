"""Optional local Streamlit view over synthetic Acadify demo events."""
import sqlite3
from pathlib import Path

import pandas as pd
import streamlit as st

DB_PATH = Path(__file__).resolve().parents[1] / ".data" / "acadify-demo.sqlite"

st.set_page_config(page_title="Acadify demo insights", page_icon="📚", layout="wide")
st.title("Acadify · Demo insights")
st.caption("Local portfolio dashboard · synthetic data only · no analytics service")

if not DB_PATH.exists():
    st.info("Start the local demo API and create a demo booking to populate these charts.")
else:
    with sqlite3.connect(DB_PATH) as connection:
        bookings = pd.read_sql_query("SELECT status, COUNT(*) AS sessions FROM demo_bookings GROUP BY status", connection)
        events = pd.read_sql_query("SELECT event_type, COUNT(*) AS total FROM demo_events GROUP BY event_type", connection)
    total = int(bookings["sessions"].sum()) if not bookings.empty else 0
    requested = int(bookings.loc[bookings["status"] == "Requested", "sessions"].sum()) if not bookings.empty else 0
    confirmed = int(bookings.loc[bookings["status"] == "Confirmed", "sessions"].sum()) if not bookings.empty else 0
    first, second, third = st.columns(3)
    first.metric("Demo sessions", total)
    second.metric("Awaiting tutor", requested)
    third.metric("Confirmed", confirmed)
    left, right = st.columns(2)
    with left:
        st.subheader("Booking status")
        st.bar_chart(bookings.set_index("status") if not bookings.empty else pd.DataFrame())
    with right:
        st.subheader("Demo activity")
        st.bar_chart(events.set_index("event_type") if not events.empty else pd.DataFrame())
